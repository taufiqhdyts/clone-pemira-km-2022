import { Logger } from '@nestjs/common';
import { 
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PrismaService } from 'prisma.service';

@WebSocketGateway()
export class VoteGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private prisma: PrismaService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  // Setiap client ngevote/update, emit message ke server.
  @SubscribeMessage('newVoteToServer')
  async handleMessage (client: Socket, payload: void) {
    // this.logger.log("Request received.")
    // Server mencari value baru
    const data = await this.prisma.vote.groupBy({
      by: ['candidate_id'],
      _count: {
        _all: true
      },
    })
    // this.logger.log("Request sent")
    // console.log(data)
    // this.logger.log(data);
    // Broadcast ke seluruh client
    this.server.emit('updateVoteToClient', data)
  }

  afterInit(server: Server):void {
    this.logger.log("Gateway initialized!")
  }

  handleConnection(client: Socket): void {
    this.logger.log(`${client.id} connected to socket.`)
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`${client.id} timed out.`)
  }
}
