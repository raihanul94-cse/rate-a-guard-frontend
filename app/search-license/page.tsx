import { HomeNavbar } from '@/components/home/home-navbar';
import { SearchLicense } from '@/components/search-license/search-license';

export default function SearchLicensePage() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />
            <main className="flex-1">
                <div className="container mx-auto py-10">
                    <div className="py-8 px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">Search a License</h1>
                                <p className="text-gray-600">
                                    Search for and review guard information and performance ratings
                                </p>
                            </div>
                            <SearchLicense />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
