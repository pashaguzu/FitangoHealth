export default (a,b,param1,param2) => {
    console.log(a,b,param1,param2);
    if(param2){
        console.log("two");
        let variableA = a[param1][param2].toUpperCase();
        let variableB = b[param1][param2].toUpperCase(); 
        if (variableA < variableB) {
            return -1;
        }
        if (variableA > variableB) {
            return 1;
        }
        return 0;
    }
    else {
        console.log("first");
    let variableA = a[param1].toUpperCase();
    let variableB = b[param1].toUpperCase(); 
    if (variableA < variableB) {
        return -1;
    }
    if (variableA > variableB) {
        return 1;
    }
    return 0;
    }
}