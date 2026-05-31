import { AppErro } from "../error/appError.js";

export class NoteDocValidator {
    static title(title) {
        if(title.length < 3){
            throw new AppErro('Titulo muito curto!', 400, 'VERY_SHORT_TITLE');
        }

        if(title.length > 255) {
            throw new AppErro('Título atingiu o máximo de caracteres!', 400, 'VERY_BIG_TITLE');
        }
        
        return title.trim()
    }
}