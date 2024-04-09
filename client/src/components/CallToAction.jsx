import { Button } from "flowbite-react"

const CallToAction = () => {
    return (
        <div className=" flex flex-col sm:flex-row p-5 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center gap-2">
            <div className="flex-1 justify-center flex flex-col">
                <h2 className="text-2xl">Want to join us?</h2>
                <p className="text-gray-600 dark:text-gray-300 my-4">Checkout the resourses Join us via Whatsapp,Twitter</p>
                <Button className="rounded-tl-xl rounded-bl-none" gradientDuoTone='purpleToPink' ><a href="https://sites.google.com/view/navinportfolio/home" target="_blank" rel="noopener noreferrer">Join Now With us</a></Button>
            </div>
            <div className="p-3 flex-1">
                <img className="rounded-xl" src="https://th.bing.com/th/id/OIP.xwrzokB4QDMtkI26vxpXWgHaDt?rs=1&pid=ImgDetMain" />
            </div>
        </div>
    )
}

export default CallToAction
