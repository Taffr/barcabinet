import { Cabinet } from '../documents/cabinet.document';
import { UpdateCabinetDTO } from '../dtos/update-cabinet.dto';
import { Maybe } from '../../util/Maybe';

export interface ICabinetStore {
  addForUser(id: string): Promise<string>;
  updateForOwner(id: string, dto: UpdateCabinetDTO): Promise<Maybe<Cabinet>>;
  getForOwner(ownerId: string): Promise<Maybe<Cabinet>>;
}
