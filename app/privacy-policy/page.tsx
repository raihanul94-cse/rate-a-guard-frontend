import { Footer } from '@/components/common/footer';
import { HomeNavbar } from '@/components/home/home-navbar';
import PrivacyPolicy from '@/components/page/privacy-policy';

export default function HomePage() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />
            <PrivacyPolicy />
            <Footer />
        </div>
    );
}
