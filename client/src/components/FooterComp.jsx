import { Footer, FooterDivider } from "flowbite-react"
import { Link } from "react-router-dom"
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs"

const FooterComp = () => {
    return (
        <Footer container className="border border-t-8 border-blue-600">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5 mr-5">
                        <Link to="/" className="self-center whitespace-nowrap text-l font-semibold dark:text-white sm:text-xl">
                            <span className="px-2 py-1 bg-gradient-to-r from-blue-600 via-violet-600 to-red-600 rounded-lg text-white mr-1">SimpleOne
                            </span>Chronicles
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-6 
                    sm:mt-4 pt-4 pr-2 sm:pt-0">

                        <div>
                            <Footer.Title title="about" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="https://sites.google.com/view/navinportfolio/home"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    PortFolio
                                </Footer.Link>
                                <Footer.Link
                                    href="https://nike-landing-site.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Nike Website
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow Us" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="https://sites.google.com/view/navinportfolio/home"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    GitHub
                                </Footer.Link>
                                <Footer.Link
                                    href="https://nike-landing-site.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    AirBnb
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">
                                    Privacy
                                </Footer.Link>
                                <Footer.Link href="#">
                                    Terms & Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <FooterDivider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href='#' by="navin kumaran blog" year={new Date().getFullYear()} />
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href='#' icon={BsFacebook} />
                        <Footer.Icon href='#' icon={BsInstagram} />
                        <Footer.Icon href='#' icon={BsTwitter} />
                        <Footer.Icon href='#' icon={BsGithub} />
                        <Footer.Icon href='#' icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default FooterComp
