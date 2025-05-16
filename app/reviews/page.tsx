import { Metadata } from 'next';
import { Shield, Star, MapPin, Phone, Mail, Globe, Info, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HomeNavbar } from '@/components/home/home-navbar';

export const metadata: Metadata = {
    title: 'NxtGen Security Reviews | Security Guard Service',
    description: "Read customer reviews of NxtGen Security. See why we're rated 4.7/5 by 23 verified customers.",
};

const reviews = [
    {
        id: 1,
        author: 'Morgan Murphy',
        date: 'Apr 28, 2025',
        rating: 5,
        title: '#1 choice for Security Guards',
        content: 'A+ service all around!',
        location: 'US',
        dateOfExperience: 'April 02, 2025',
    },
    {
        id: 2,
        author: 'Andrew Smith',
        date: 'Mar 26, 2025',
        rating: 5,
        title: 'Stop searching. Read this!',
        content:
            "Greater Boston folks, these guys are legit. Such a great security company. Do yourself a favor if you're in need of guarding and save the trouble of looking around.",
        location: 'US',
    },
    // Add more reviews as needed
];

export default function ReviewsPage() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />
            <main className="flex-1">
                <div className="min-h-screen bg-background">
                    <main className="container mx-auto py-8">
                        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
                            {/* Company Header */}
                            <div className="flex items-start gap-6">
                                <div className="h-24 w-24 flex-shrink-0">
                                    <Shield className="h-full w-full text-blue-600" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-2xl font-bold">NxtGen Security</h1>
                                        <Badge variant="outline" className="rounded-full">
                                            <Info className="mr-1 h-3 w-3" />
                                            Claimed profile
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            <Star className="h-5 w-5 fill-current text-green-500" />
                                            <span className="ml-1 font-semibold">4.7</span>
                                        </div>
                                        <span className="text-muted-foreground">•</span>
                                        <span className="text-muted-foreground">Reviews 23</span>
                                        <span className="text-muted-foreground">•</span>
                                        <span className="text-blue-600">Security Guard Service</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button>Write a review</Button>
                                        <Button variant="outline">Visit website</Button>
                                    </div>
                                </div>
                            </div>

                            {/* Rating Summary */}
                            <Card className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-4xl font-bold">4.7</div>
                                        <div className="text-sm text-muted-foreground">Excellent</div>
                                        <div className="text-sm text-muted-foreground">23 reviews</div>
                                    </div>
                                    <div className="space-y-2">
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                            <div key={rating} className="flex items-center gap-2">
                                                <div className="w-16 text-sm">{rating}-star</div>
                                                <div className="h-2 flex-1 rounded-full bg-muted">
                                                    <div
                                                        className="h-full rounded-full bg-green-500"
                                                        style={{
                                                            width: rating === 5 ? '100%' : '0%',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>

                            {/* Reviews Section */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">All reviews</h2>
                                    <div className="flex items-center gap-4">
                                        <Button variant="outline" size="sm">
                                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                                            More filters
                                        </Button>
                                        <Select defaultValue="recent">
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Sort by" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="recent">Most recent</SelectItem>
                                                <SelectItem value="highest">Highest rated</SelectItem>
                                                <SelectItem value="lowest">Lowest rated</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input placeholder="Search reviews..." className="pl-10" />
                                </div>

                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <Card key={review.id} className="p-6">
                                            <div className="flex items-start gap-4">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback>{review.author[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <div className="font-semibold">{review.author}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {review.date}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {Array(review.rating)
                                                            .fill(null)
                                                            .map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className="h-4 w-4 fill-current text-green-500"
                                                                />
                                                            ))}
                                                    </div>
                                                    <h3 className="font-semibold">{review.title}</h3>
                                                    <p className="text-muted-foreground">{review.content}</p>
                                                    {review.dateOfExperience && (
                                                        <div className="text-sm text-muted-foreground">
                                                            Date of experience: {review.dateOfExperience}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Company Details */}
                            <Card className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Company details</h3>
                                        <div className="mt-4 space-y-4">
                                            <p className="text-sm text-muted-foreground">
                                                At NxtGen Security, we provide comprehensive security solutions that
                                                encompass elite on-site guarding, advanced video surveillance, and
                                                robust cybersecurity services across Massachusetts.
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Contact info</h3>
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">
                                                    10 Rogers St Suite 101, 02142, Cambridge, United States
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <a
                                                    href="tel:(508) 314-3937"
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    (508) 314-3937
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <a
                                                    href="mailto:contact@nxtgsecurity.com"
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    contact@nxtgsecurity.com
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4 text-muted-foreground" />
                                                <a
                                                    href="https://nxtgsecurity.com"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    nxtgsecurity.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </main>
                </div>
            </main>
        </div>
    );
}
