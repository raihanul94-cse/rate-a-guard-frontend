import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">RAG</h3>
                        <p className="text-gray-300">
                            Enhancing Security Workforce Stability through comprehensive guard rating and review
                            systems.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="text-gray-300 hover:text-white transition-colors">
                                    Register Company
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact-us" className="text-gray-300 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p className="text-gray-300">© 2024 RAG. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
