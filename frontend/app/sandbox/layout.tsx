export default function Layout({children}:{children:React.ReactNode}){
    return(
        <>
        <div className="grid h-screen w-screen">
            {children}
        </div>
        
        </>
    )
}