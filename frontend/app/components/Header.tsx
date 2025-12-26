import Image from "next/image"

export default function Header(){
    return(
        <>
        <header className="bg-stone-100 border-b border-stone-400">
            <div>
                <Image src={'/next.svg'} alt="Bsness app logo" width={3} height={3}/>
                <h1 className="text-stone-950 xl:text-4xl">Bsness App</h1>
            </div>
            <div></div>
            <div></div>
        </header>
        </>
    )
}