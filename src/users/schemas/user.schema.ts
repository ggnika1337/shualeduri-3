import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  gender!: string;

  @Prop({ type: Number })
  age!: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
