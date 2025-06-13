import { Footer } from '@/components/common/footer';
import { HomeNavbar } from '@/components/home/home-navbar';
import ContactUs from '@/components/page/contact-us';

export default function HomePage() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />
            <ContactUs />
            <Footer />
        </div>
    );
}
