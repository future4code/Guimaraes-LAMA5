import {app} from "./app"
import {userRouter} from "./routes/userRouter"
import {showRouter} from "./routes/showRouter"
import {bandRouter} from "./routes/bandRouter"



app.get("/", async function(){
  console.log("endpoint teste")
})

app.use("/user", userRouter)

app.use("/show",showRouter)

app.use("/band",bandRouter)