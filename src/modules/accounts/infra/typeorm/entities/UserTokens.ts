import { v4 as uuidV4} from 'uuid'

import {Entity, CreateDateColumn, PrimaryColumn, Column, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './User';

@Entity('users_tokens')
class UserTokens{

    @PrimaryColumn()
    id: string;

    @Column()
    user_id: string

    @Column()
    refresh_token: string
   
    @Column()
    expires_date: Date

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(()=> User)
    @JoinColumn({name: 'user_id'})
    user: User

    constructor(){
        if(!this.id){
            this.id = uuidV4()
        }
    }
}

export { UserTokens }