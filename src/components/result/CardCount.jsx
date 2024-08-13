import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const CardCount = ( {title, value} ) => {
    return (
        <Card className="">
            <CardHeader className="py-2 px-3">
                <CardTitle>
                    <h1 class="text-1xl font-bold">{title}</h1>
                </CardTitle>

            </CardHeader>
            <CardContent>
                <div class=" flex justify-center items-center">
                    <h1 className="text-3xl font-bold">{value}</h1>
                </div>
            </CardContent>
        </Card>
    )
}

export default CardCount