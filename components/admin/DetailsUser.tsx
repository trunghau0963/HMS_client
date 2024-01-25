import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

type User = {
  userName: string,
  email: string,
  phoneNumber: string,
  userAddress: string,
  dob: Date,
  avatar: string,
  role: string
}

export default function DetailsUser({ user }: { user: any }) {
  return (
    <div>
      <div className="w-full max-w-md p-4 mx-2 md:mx-0">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage alt="User avatar" src="/placeholder-avatar.jpg" />
            <AvatarFallback>{user.id}</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 text-center">
            <div className="text-lg font-medium">{user.userName}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{user.userAddress ? user.userAddress : "Null"}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(user.dob) ? new Date(user.dob).toISOString().split("T")[0] : "Null"}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{`+84 ${user.phoneNumber.slice(1, 3)} ${user.phoneNumber.slice(3, 6)} ${user.phoneNumber.slice(6)}`}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
          </div>
        </div>
        {/* <Button className="w-full">Edit Information</Button> */}
      </div>
    </div>
  )
}

