
function calculateMontlySalary(){
    if (process.argv.length <= 2) {
        console.log("Please pass all the paramter");
        console.log("FirstName LastName AnualSalary superRate Month");
        process.exit(-1);
    }
    let empfName,emplName,anualSalary,superRate,paymentStartDate;
    
    process.argv.forEach((val, index) => {
        if(index==2) empfName = val;
        if(index==3) emplName = val;
        if(index==4) anualSalary = val;
        if(index==5) superRate = val;
        if(index==6) paymentStartDate = val;
    });
    let taxAmountPerMonth =Math.round(calculatTax(anualSalary)/12);
    let superAmountPerMonth =Math.round(anualSalary * superRate /1200);
    let salaryPerMonth =Math.round(anualSalary / 12);
    let netSalary = salaryPerMonth - taxAmountPerMonth;
    console.log(empfName + ' ' + emplName + ' gross-income: '+salaryPerMonth+',income-tax: '+taxAmountPerMonth+', net-income: '+netSalary+', super-amount: '+superAmountPerMonth )
}
function calculatTax(grossSalary){
    let taxSlab = [
        {min:0,max:18200,rate:0},
        {min:18201,max:37000,rate:19,plus:0},
        {min:37001,max:87000,rate:32.5,plus:3572},
        {min:87001,max:180000,rate:37,plus:19822},
        {min:180001,max:0,rate:45,plus:54232}
      ];
    let i = 0;
    let taxAmount = 0;
    function rec(){
        if(
            (grossSalary >= taxSlab[i].min && grossSalary <= taxSlab[i].max)
            || (grossSalary >= taxSlab[i].min && !taxSlab[i].max)
          ){
            taxAmount = taxSlab[i].plus + Math.round((grossSalary-taxSlab[i].min) * taxSlab[i].rate / 100)
        }else{
            i++;
            rec()
        }
    }
    rec();
    return taxAmount;
}
calculateMontlySalary();
