import { Skeleton } from '@/components/ui/skeleton'


export default function SkeletonLoader() {
    return (
        <div>
            <div className='flex md:justify-end my-2'>
                <Skeleton className={"h-[40px] md:w-4/6 w-full rounded-md"} />
            </div>
            <Skeleton className={"h-[40px] w-4/6 rounded-md"} />
            <Skeleton className={"h-[60px] mt-2 w-full rounded-md"} />
            <Skeleton className={"h-[350px] mt-2 w-full rounded-md"} />
            <Skeleton className={"h-[350px] mt-2 w-full rounded-md"} />
        </div>
    )
}
