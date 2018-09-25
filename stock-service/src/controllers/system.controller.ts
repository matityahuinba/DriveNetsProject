import {Controller, Get} from "routing-controllers";
import config from '../config';

@Controller('/system')
export class SystemController {

    @Get("/config")
    getConfig() {
       return config;
    }

}