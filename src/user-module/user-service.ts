import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user';

@Injectable()
export class UserService {
  public users: User[] = [];
  getUsers(): User[] {
    return this.users;
  }
  getUser(email: string): User {
    const userData = this.users.filter((user) => user.email === email);
    if (userData && Array.isArray(userData) && userData.length > 0) {
      return userData[0];
    } else {
      throw new NotFoundException('User not found');
    }
  }
  addUser(user: User): User {
    this.users.push(user);
    return user;
  }
  deleteUser(email: string): User[] {
    const remainingUser = this.users.filter((user) => user.email !== email);
    if (remainingUser.length === this.users.length) {
      throw new NotFoundException('User not found');
    }
    this.users = remainingUser;
    return remainingUser;
  }
}
