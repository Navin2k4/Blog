import { Button } from "flowbite-react"

const CallToAction = () => {
    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className="flex-1 justify-center flex flex-col">
                <h2 className='text-2xl'>
                    Ready to join the movement for urban uplift?                </h2>
                <p className='dark:text-gray-300 my-5 mx-10 text-black'>
                    Join us to drive change! Follow us on Twitter for updates or join our WhatsApp group for discussions and initiatives. Let's make our cities better together!                </p>
                <Button className='rounded-tl-xl mx-10 rounded-bl-none bg-custom-gradient'>
                    <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                        Join us now.
                    </a>
                </Button>
            </div>
            <div className="p-7 flex-1 ">
                <img className="rounded-xl" src="https://firebasestorage.googleapis.com/v0/b/blog-2fbac.appspot.com/o/Res%2FUrban.png?alt=media&token=8ae09fd8-6d2e-4582-a3bd-2685f85e98b0" />
            </div>
        </div>
    )
}

export default CallToAction
