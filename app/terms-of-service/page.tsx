import { Footer } from '@/components/common/footer';
import { HomeNavbar } from '@/components/home/home-navbar';
import TermsOfService from '@/components/page/terms-of-service';

export default function HomePage() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />
            <TermsOfService />
            <Footer />
        </div>
    );
}
