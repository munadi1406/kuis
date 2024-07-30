import WithQuery from '@/utils/WithQuery';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Badge } from '../ui/badge';
import { buttonVariants } from '../ui/button';
import ButtonLoader from '../ButtonLoader';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

const HistorySubmittion = ({ idUser }) => {

  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setFilter(e)
  }
  const {
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: [`history${idUser}`],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get(
        `/api/quiz/history?id_u=${idUser}&id=${pageParam || 0}&search=${query}`
      );
      return response.data;
    },

    getNextPageParam: (lastPage) => lastPage.data.lastId,
    staleTime: 5000,
    initialPageParam: 0,
  });
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
    }
  };
  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <div className='space-y-2'>
      <div>
        <Input
          type="search"
          id="search"
          placeholder="Search"
          onChange={search}
          defaultValue={query}
          disabled={isLoading || isRefetching}
        />
      </div>
      {!isLoading && !isRefetching ? (
        <>
          {data.pages &&
            data.pages
              .flatMap((page) => page.data.data)
              .map(({ id, quiz, id_quiz }, i) => (
                <Card key={id} >
                  <CardHeader>
                    <CardTitle className="flex gap-2 flex-wrap">
                      <Badge>Guru : {quiz.detail_user.nama_lengkap}</Badge>
                      <Badge className={"bg-green-500 text-white hover:bg-green-400"}>Kelas : {quiz.kelas.kelas}</Badge>
                      <Badge className={"bg-blue-500 text-white hover:bg-blue-400"}>{quiz.mapel.mapel}</Badge>
                    </CardTitle>
                    <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className='text-2xl'>Nilai {(quiz.answers.length / quiz.questions.length * 100).toFixed(1)}</h3>
                  </CardContent>
                  <CardFooter>
                    <a href={`/result/${id_quiz}/${idUser}`} className={buttonVariants()}>Lihat Detail Nilai</a>
                  </CardFooter>
                </Card>
              ))
          }
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
        </>
      ) : (
      <div className='space-y-2'>
      <Skeleton className={'w-full h-[200px]'}/>
      <Skeleton className={'w-full h-[200px]'}/>
      <Skeleton className={'w-full h-[200px]'}/>
      </div>
    )}

    
    </div>
  )
}

export default WithQuery(HistorySubmittion)