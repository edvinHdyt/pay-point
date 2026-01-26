import TitlePage from "./TitlePage"

const ModalCard = () => {
    return (
        <>
            <div className="bg-white w-full absolute z-50">
                <TitlePage title={"Cart"}/>
                <button className="flex justify-center items-center bg-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                </button>
            </div>
        </>
    )
}