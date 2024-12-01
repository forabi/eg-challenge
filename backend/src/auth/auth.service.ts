import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const user = await this.usersService.create({
      ...signUpDto,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    return { token };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOne(signInDto.email);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    return { token };
  }
}
