export function removeCopyArray(array) {
    const array2 = []
    array.forEach(item => {
        const itemDuo = array2.find(itemDuo => item === itemDuo)
        if(!itemDuo){
            array2.push(item)
        }
    }); 

    return array2
} 