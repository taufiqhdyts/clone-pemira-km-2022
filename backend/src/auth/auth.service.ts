import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserService } from 'user/user.service';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';
import { PrismaService } from 'prisma.service';
import * as argon2 from 'argon2';
import * as parser from 'xml2json';
import axios from 'axios';

const listAllKeys = (jsoninput) => {
  const listOfKeys = [];
  const queue = [jsoninput];
  while (queue.length !== 0) {
    const currentjson = queue.pop();
    for (const key in currentjson) {
      listOfKeys.push(key);
      if (typeof currentjson[key] === 'object') {
        queue.push(currentjson[key]);
      }
    }
  }
  return listOfKeys;
};

const isTpb = (nim) => {
  return [
    '160',
    '161',
    '162',
    '163',
    '165',
    '166',
    '167',
    '168',
    '169',
    '190',
    '199',
  ].includes(nim.substring(0, 3));
};

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async loginIna(ticket: string, res: any) {
    const url = `https://login.itb.ac.id/cas/serviceValidate?ticket=${ticket.trim()}&service=https%3A%2F%2Fpemira.km.itb.ac.id%2Fbackend%2Fauth%2Flogin-ina`;
    // TODO - why error?
    const { data } = await axios.get(url);
    const result = JSON.parse(parser.toJson(data));

    console.log(result);

    if (listAllKeys(result).includes('cas:authenticationFailure')) {
      throw 'Invalid Ticket';
    }

    const user_attributes =
      result['cas:serviceResponse']['cas:authenticationSuccess'][
        'cas:attributes'
      ];

    const nim_arr = user_attributes['cas:itbNIM'];

    let nim;
    if (nim_arr.length === 2) {
      for (let i = 0; i < nim_arr.length; i++) {
        if (!isTpb(nim_arr[i])) {
          nim = nim_arr[i];
        }
      }
    } else {
      nim = nim_arr;
    }

    let user = await this.userService.findOne({ nim });

    if (!user) {
      await this.userService.create({
        nim,
        email_itb: user_attributes['cas:mail'],
        email_non_itb: user_attributes['cas:itbEmailNonITB'],
        long_name: user_attributes['cas:cn'],
        short_name: user_attributes['cas:sn'],
        fakultas: user_attributes['cas:ou'],
      });

      user = await this.userService.findOne({ nim });
    }

    const token = this.jwtService.sign({ id: user.id });

    return res.redirect(`https://pemira.km.itb.ac.id/token?token=${token}`);
  }

  async me(req) {
    const user = await this.userService.findOne({ id: req.user.id });

    return { ...user };
  }

  async loginCandidate(candidate_input: { nim: string; password: string }) {
    const candidate = await this.prisma.candidate.findFirst({
      where: {
        account: {
          nim: {
            equals: candidate_input.nim,
          },
        },
      },
    });

    if (!candidate) {
      throw 'No candidate with nim';
    }

    const verify = await argon2.verify(
      candidate.password,
      candidate_input.password,
    );

    if (verify) {
      return {
        access_token: this.jwtService.sign({
          id: candidate.id,
        }),
      };
    }
    throw 'Invalid password';
  }

  async loginAdmin(admin_input: { username: string; password: string }) {
    const admin = await this.prisma.admin.findFirst({
      where: {
        username: {
          equals: admin_input.username,
        },
      },
    });

    if (!admin) {
      throw 'No admin with username';
    }

    const verify = await argon2.verify(admin.password, admin_input.password);

    if (verify) {
      return {
        access_token: this.jwtService.sign({
          id: admin.id,
        }),
      };
    }
    throw 'Invalid password';
  }
}
