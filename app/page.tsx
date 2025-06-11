import Link from 'next/link';
import { Footer } from '@/components/common/footer';
import { HomeNavbar } from '@/components/home/home-navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Search, Shield, Star, UserPlus, Users } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Enhancing Security
                        <span className="text-blue-600 block">Workforce Stability</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        RAG provides a comprehensive platform for security companies to register, rate, and review
                        security guards, creating accountability and improving service quality across the industry.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                                Register Now
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="px-8 py-3">
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose RAG?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                <CardTitle>Comprehensive Rating System</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Rate guards on attendance, professionalism, productivity, customer service, and
                                    communication with our 5-star system.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                <CardTitle>Token Rewards</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Earn tokens for contributing reviews and ratings, creating a collaborative community
                                    of security professionals.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                <CardTitle>License Verification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Search and verify guard licenses with detailed information about their status,
                                    history, and performance ratings.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                <CardTitle>Guard Information Sharing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Share and access detailed guard information to make informed hiring decisions and
                                    improve workforce quality.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                <CardTitle>Verified Companies</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    All companies are verified with proper licensing before accessing the platform,
                                    ensuring credibility and trust.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <UserPlus className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                <CardTitle>Easy Registration</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Simple registration process for both companies and guards with comprehensive
                                    licensing verification.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            <section className="py-16 px-4 bg-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to Improve Your Security Workforce?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join RAG today and become part of a community dedicated to enhancing security workforce
                        stability and accountability.
                    </p>
                    <Link href="/register">
                        <Button size="lg" variant="secondary" className="px-8 py-3">
                            Get Started Today
                        </Button>
                    </Link>
                </div>
            </section>
            <Footer />
        </div>
    );
}
