import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";

export default function Navbar({ data, role, path, roleUser }) {
  return (
    <>
      <div className="shadow bg-white font-poppins hidden md:block">
        <div className="h-16 mx-auto px-5 flex items-center justify-start gap-5">
          <div className="flex w-full gap-10 items-end">
            <a className="text-2xl font-semibold hover:text-cyan-500 transition-colors cursor-pointer">
              QuizSDNPU
            </a>
            <div className="flex justify-between items-center w-full">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/dashboard"
                      className={navigationMenuTriggerStyle()}

                      active={path === "/dashboard" && true}
                    >
                      Dashboard
                    </NavigationMenuLink>
                    {role !== "users" && (
                      <NavigationMenuLink
                        href="/users"
                        className={navigationMenuTriggerStyle()}
                        active={path === "/users" && true}
                      >
                        Users
                      </NavigationMenuLink>
                    )}
                    <NavigationMenuLink
                      href="/feedback"
                      active={path === "/feedback" && true}
                      className={navigationMenuTriggerStyle()}
                    >
                      Umpan Balik
                    </NavigationMenuLink>
                  
                    {roleUser === "Guru" || roleUser === "admin" ? (
                      <>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            className={navigationMenuTriggerStyle()}
                          >
                            Data Master
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {role === "admin" && (
                              <>
                                <a href="/mapel">
                                  <DropdownMenuItem>
                                    Mata Pelajaran
                                  </DropdownMenuItem>
                                </a>
                                <a href="/kelas">
                                  <DropdownMenuItem>Kelas</DropdownMenuItem>
                                </a>
                                <a href="/tahunajaran">
                                  <DropdownMenuItem>Tahun Ajaran</DropdownMenuItem>
                                </a>
                              </>
                            )}
                            <a href="/guru">
                              <DropdownMenuItem>Guru</DropdownMenuItem>
                            </a>
                            <a href="/siswa">
                              <DropdownMenuItem>Siswa</DropdownMenuItem>
                            </a>
                            {/* <a href="/hp">
                              <DropdownMenuItem>HP</DropdownMenuItem>
                            </a> */}

                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    ) : <></>}
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-[9px] font-semibold bg-blue-600/60  rounded-md p-2 text-white">
                  {data.email}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <a href="/profile">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  </a>
                  <DropdownMenuSeparator />
                  <a href="/api/auth/signout">
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </a>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden block bg-white z-10 shadow-md border-t-4 border-blue-600 fixed bottom-0 py-2 px-3 w-full flex justify-between items center gap-2">
        <a
          href="/dashboard"
          className={buttonVariants({
            variant: "outline",
            className:
              "px-2 w-1/6 block flex justify-center items-center flex-col h-full",
          })}
        >
          <div className="flex justify-between items-center flex-col">
            <span className="material-symbols-outlined  text-xl text-gray-900">
              dashboard
            </span>
            <h3 className="text-[9px] text-gray-600 font-semibold">Dashboard</h3>
          </div>
        </a>
        {role !== "users" && (
          <a
            href="/users"
            className={buttonVariants({
              variant: "outline",
              className:
                "px-2 w-1/6 block flex justify-center items-center flex-col h-full",
            })}
          >
            <div className="flex justify-center items-center flex-col">
              <span className="material-symbols-outlined text-xl text-gray-900">
                group
              </span>
              <h3 className="text-[9px] text-gray-600 font-semibold">Users</h3>
            </div>
          </a>
        )}
        <a
          href="/feedback"
          className={buttonVariants({
            variant: "outline",
            className:
              "px-2 w-1/6 block flex justify-center items-center flex-col h-full",
          })}
        >
          <div className="flex justify-center items-center flex-col">
            <span className="material-symbols-outlined text-xl text-gray-900">
              feedback
            </span>
            <h3 className="text-[9px] text-gray-600 font-semibold text-center">
              Umpan Balik
            </h3>
          </div>
        </a>
        {role !== "users" && (
          <>
            

            <DropdownMenu>
              <DropdownMenuTrigger className="border rounded-md px-2 w-1/6 block flex justify-center items-center flex-col">
                <div className="flex justify-center items-center flex-col">
                  <span className="material-symbols-outlined text-xl text-gray-900">
                    Database
                  </span>
                  <h3 className="text-[9px] text-gray-600 font-semibold">
                    Master
                  </h3>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {role === "admin" && (
                  <>
                    <a href="/mapel">
                      <DropdownMenuItem>Mapel</DropdownMenuItem>
                    </a>
                    <DropdownMenuSeparator />
                    <a href="/kelas" className="cursor-pointer">
                      <DropdownMenuItem>Kelas</DropdownMenuItem>
                    </a>
                    <a href="/tahunajaran" className="cursor-pointer">
                      <DropdownMenuItem>Tahun Ajaran</DropdownMenuItem>
                    </a>
                    <DropdownMenuSeparator />
                  </>
                )}

                <a href="/guru" className="cursor-pointer">
                  <DropdownMenuItem>Guru</DropdownMenuItem>
                </a>
                <DropdownMenuSeparator />
                <a href="/siswa" className="cursor-pointer">
                  <DropdownMenuItem>Siswa</DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className="border rounded-md px-2 w-1/6 block flex justify-center items-center flex-col">
            <div className="flex justify-center items-center flex-col">
              <span className="material-symbols-outlined text-xl text-gray-900">
                Person
              </span>
              <h3 className="text-[9px] text-gray-600 font-semibold">Profile</h3>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <a href="/profile">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </a>
            <DropdownMenuSeparator />
            <a href="/api/auth/signout" className="cursor-pointer">
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </a>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
