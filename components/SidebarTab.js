import Link from "next/link";
import { useRouter } from "next/router";

export default function SidebarTab({title, Icon}){
    const router = useRouter()
    return(
        <Link href={`/${title.toLowerCase()}`} legacyBehavior>
            <a className={`font-bold`}>
                <span className={`flex flex-row gap-4 lg:text-md text-sm text-${router?.pathname == "/"+title.toLowerCase() ? 'green-500' : 'white'} pr-4 ml-4 mt-4 hover:opacity-80 transition duration-75 p-2.5 rounded-md`}>
                {Icon}
                {title}
                </span>
            </a>
        </Link>
    )
}