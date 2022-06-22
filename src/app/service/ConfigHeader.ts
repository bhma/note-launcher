import { environment } from './../../environments/environment';
import { HttpHeaders } from "@angular/common/http";

const Token = environment.TOKEN_NAME;

export function setHeader(): HttpHeaders{
    return new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem(Token)}`});
}
