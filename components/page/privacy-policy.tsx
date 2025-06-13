const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white rounded-lg shadow-sm p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

                <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 mb-6">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                        <p className="text-gray-700 mb-4">
                            At RateAGuard, we collect information you provide directly to us when you:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li>Register for an account as a security company</li>
                            <li>Register security guard information</li>
                            <li>Submit ratings and reviews</li>
                            <li>Contact us for support</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                        <p className="text-gray-700 mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li>Provide and maintain our services</li>
                            <li>Verify company and guard licenses</li>
                            <li>Enable rating and review functionality</li>
                            <li>Communicate with you about your account</li>
                            <li>Improve our platform and services</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
                        <p className="text-gray-700 mb-4">
                            We may share your information only in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li>With other verified security companies for guard verification purposes</li>
                            <li>When required by law or to protect our rights</li>
                            <li>With service providers who assist in our operations</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                        <p className="text-gray-700 mb-4">
                            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
                        <p className="text-gray-700 mb-4">
                            You have the right to access, update, or delete your personal information. Contact us to exercise these rights.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
                        <p className="text-gray-700">
                            If you have any questions about this Privacy Policy, please contact us at privacy@rateaguard.com
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;