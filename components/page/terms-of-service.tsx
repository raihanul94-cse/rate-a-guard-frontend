const TermsOfService = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white rounded-lg shadow-sm p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

                <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 mb-6">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-700 mb-4">
                            By accessing and using RateAGuard, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
                        <p className="text-gray-700 mb-4">
                            RateAGuard provides a platform for security companies to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li>Register and verify their company credentials</li>
                            <li>Register security guards with proper licensing</li>
                            <li>Rate and review security guard performance</li>
                            <li>Search and verify guard licenses and ratings</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
                        <p className="text-gray-700 mb-4">
                            Users agree to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li>Provide accurate and truthful information</li>
                            <li>Maintain valid licensing and credentials</li>
                            <li>Submit honest and fair ratings and reviews</li>
                            <li>Respect the privacy and rights of others</li>
                            <li>Comply with all applicable laws and regulations</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Prohibited Activities</h2>
                        <p className="text-gray-700 mb-4">
                            Users may not:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                            <li>Submit false or misleading information</li>
                            <li>Create fake accounts or impersonate others</li>
                            <li>Submit fraudulent ratings or reviews</li>
                            <li>Interfere with the platform's operation</li>
                            <li>Violate any applicable laws or regulations</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Account Termination</h2>
                        <p className="text-gray-700 mb-4">
                            We reserve the right to terminate or suspend accounts that violate these terms or engage in prohibited activities.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
                        <p className="text-gray-700 mb-4">
                            RateAGuard is provided "as is" without warranties. We are not liable for any damages arising from the use of our platform.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
                        <p className="text-gray-700 mb-4">
                            We may update these terms from time to time. Continued use of the platform constitutes acceptance of updated terms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
                        <p className="text-gray-700">
                            For questions about these Terms of Service, contact us at legal@rateaguard.com
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;