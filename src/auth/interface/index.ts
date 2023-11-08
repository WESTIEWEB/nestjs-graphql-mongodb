import passport from 'passport';
import { USERROLE } from 'src/common/interface';

export type ProfileI = passport.Profile;

export interface JwtPayloadI {
  email: string;
  sub: string;
  type: USERROLE;
}
