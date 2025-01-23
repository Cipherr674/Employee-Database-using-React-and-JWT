const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://anupmanil10:5bACCJgShJVgqvwC@cluster0.cjnux.mongodb.net/EmployeeDatabase1?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Connection established to DB');
}).catch(()=>{
    console.log('Not connected');
})
