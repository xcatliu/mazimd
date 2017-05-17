import { Document, Schema, model } from 'mongoose';
import * as md5 from 'md5';

interface IPage extends Document {
  id: string,
  content: string,
  contentToMd5: () => string
}

const PageSchema = new Schema({
  id: String,
  content: String
});

PageSchema.methods.contentToMd5 = function () {
  return md5(this.content);
}

export default model<IPage>('Page', PageSchema);
