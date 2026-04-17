import mongoose from "mongoose";

const connectDB = async () => {
 
    const reset = "\x1b[0m";
    const cyan = "\x1b[36m";
    const red = "\x1b[31m";
    const bold = "\x1b[1m";

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);

    
        console.log(`${bold}${cyan}>> MongoDB Connected: ${conn.connection.host}${reset}`);
        
    } catch (error) {
      
        console.error(`${bold}${red}!! MongoDB Connection Error: ${error.message}${reset}`);
        
     
        process.exit(1);
    }
};

export default connectDB;