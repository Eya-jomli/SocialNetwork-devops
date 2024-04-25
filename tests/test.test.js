const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
const { Server } = require('socket.io');
const { initializeSocket } = require('../socket/socket');

require("dotenv").config();

describe('Chat CRUD', () => {
  let chatId;

  it('should get chats of a user', async () => {
    const res = await request(app).get('/chat/test_user_id');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe('Message CRUD', () => {
  let messageId;
  let chatId;

  beforeAll(async () => {
    // You may want to create a chat before adding a message to it
    const chatRes = await request(app)
      .post('/chat/create')
      .send({ senderId: 'sender_id', receiverId: 'receiver_id' });

    // Set chatId to the ID of the newly created chat
    chatId = chatRes.body._id;
  });

  it('should add a message to a chat', async () => {
    const res = await request(app)
      .post('/message/add')
      .send({ chatId: chatId, senderId: 'sender_id', type: 'text', text: 'Hello' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    messageId = res.body._id;
  });
});
  