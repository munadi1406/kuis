import WithQuery from "@/utils/WithQuery";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { buttonVariants } from "../ui/button";
import { Badge } from "../ui/badge";
import ButtonLoader from "../ButtonLoader";

import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import QuizCard from "./QuizCard";




const DashboardData = ({ idUser, role, roleUser }) => {
    
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState(roleUser === 'siswa' ? 'kelas' : "kuis")
    const [openSheet, setOpenSheet] = useState(false);
    const [selectData, setSelectData] = useState({ title: "", data: [] })
    const handleChange = (e) => {
        setFilter(e)
    }
    const {
        isLoading,
        isSuccess,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data,
        refetch,
        isRefetching,
    } = useInfiniteQuery({
        queryKey: [`quiz${idUser}${filter}${query}`],
        queryFn: async ({ pageParam }) => {
            const response = await axios.get(
                `/api/quiz/data?id_u=${idUser}&id=${pageParam || 0}&search=${query}&filter=${filter}`
            );
            return response.data;
        },

        getNextPageParam: (lastPage) => lastPage.data.lastId,
        staleTime: 5000,
        initialPageParam: 0,
    });
    useEffect(() => {
        refetch()
    }, [filter,query])
    

    let searchTimeout;
    const search = (e) => {
        const query = e.target.value;
        if (query.length > 0) {
            // setIsSearch(true);
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            searchTimeout = setTimeout(async () => {
                setQuery(query);
            }, 2000);
        } else {
            setQuery("");
            refetch()
        }
    };
    useEffect(() => {
        refetch();
    }, [query]);

    return (
        <div>
            <div className="w-full py-2 flex justify-end gap-2">
                <div>
                    <Input
                        type="search"
                        id="search"
                        placeholder="Search"
                        onChange={search}
                        defaultValue={query}
                        disabled={isLoading}
                    />
                </div>
             
                <Select onValueChange={handleChange} value={filter} disabled={isLoading}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        {roleUser !== 'siswa' &&
                            <SelectItem value="kuis">Kuis</SelectItem>
                        }
                        <SelectItem value="kelas">Kelas</SelectItem>
                        <SelectItem value="mapel">Mapel</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {isSuccess  ? (<>
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 w-full">
                    {data.pages.length > 0 && filter === "kuis" &&
                        data.pages
                            .flatMap((page) => page.data.data)
                            .map((e, i) => (
                                <QuizCard key={i} data={e} />
                            ))
                    }
                    {data.pages.length > 0 && filter === "kelas" &&
                        data.pages
                            .flatMap((page) => page.data.data)
                            .map(({ id, kelas, quiz }, i) => (
                                <Card key={id} onClick={() => { setOpenSheet(true), setSelectData({ title: kelas, data: quiz }) }} className="cursor-pointer">
                                    <CardHeader>
                                        <CardTitle>Kelas {kelas}</CardTitle>
                                    </CardHeader>
                                </Card>
                            ))
                    }
                    {data.pages.length > 0 && filter === "mapel" &&
                        data.pages
                            .flatMap((page) => page.data.data)
                            .map(({ id, mapel, quiz, id_user }, i) => (
                                <Card key={id} onClick={() => { setOpenSheet(true), setSelectData({ title: mapel, data: quiz }) }} className="cursor-pointer">
                                    <CardHeader>
                                        <CardTitle>{mapel}</CardTitle>
                                    </CardHeader>
                                </Card>
                            ))
                    }
                </div>
                <div className="mt-2 flex w-full justify-end">

                    {hasNextPage && (
                        <ButtonLoader
                            text={`${isFetchingNextPage ? "Loading..." : "Load More"}`}
                            loading={isFetchingNextPage}
                            onClick={fetchNextPage}
                            disabled={isFetchingNextPage}
                        />
                    )}
                </div>
                <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Data Kuis Pada {filter === "kelas" ? `Kelas ${selectData.title}` : `Mata Pelajaran ${selectData.title}`}</SheetTitle>
                            <SheetDescription>Daftar Kuis Pada {filter === "kelas" ? `Kelas ${selectData.title}` : `Mata Pelajaran ${selectData.title}`}</SheetDescription>
                        </SheetHeader>
                        <div className="py-2 flex flex-col gap-2">
                            {selectData.data.map((e) => (
                                <Card key={e.id} className="cursor-pointer">
                                    <CardHeader>
                                        <CardTitle>{e.title} {idUser === e.id_user && <Badge className={"bg-blue-500 text-white"}>Kuis Anda</Badge>}</CardTitle>
                                        {roleUser === "siswa" ?
                                            <a className={buttonVariants()} href={`/take/${e.id}`}>Kerjakan Kuis</a>
                                            : (
                                                idUser === e.id_user &&
                                                <a className={buttonVariants()} href={`/kuis/${e.id}`}>Detail</a>
                                            )}
                                    </CardHeader>
                                </Card>
                            )
                            )}
                            {selectData.data.length < 0 && <div>Tidak ada kuis</div>}
                        </div>
                    </SheetContent>
                </Sheet>
            </>) : (
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 w-full">
                    <Skeleton className={'w-full h-[150px] rounded-md'}/>
                    <Skeleton className={'w-full h-[150px] rounded-md'}/>
                    <Skeleton className={'w-full h-[150px] rounded-md'}/>
                    <Skeleton className={'w-full h-[150px] rounded-md'}/>
                    <Skeleton className={'w-full h-[150px] rounded-md'}/>
                    <Skeleton className={'w-full h-[150px] rounded-md'}/>
                </div>
            )}


        </div>
    )
}

export default WithQuery(DashboardData)