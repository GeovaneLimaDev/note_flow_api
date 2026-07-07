//função para trocar as marcações do html e subsituir pelos dados reais
export default function replacePlaceholders (obj, string){
    const keys = Object.keys(obj)
    const value = Object.values(obj)
    let stringReplace = ""
    const splaces = []
    for (let c = 0; c < keys.length; c++) {
        if(!stringReplace){
            stringReplace = string.replace(`{{${keys[c]}}}`, value[c])
        }else {
            stringReplace = stringReplace.replace(`{{${keys[c]}}}`, value[c])
        }

        
    }
    return stringReplace 
}