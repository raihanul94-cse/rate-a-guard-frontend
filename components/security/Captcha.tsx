import ReCAPTCHA from 'react-google-recaptcha';

export function Captcha({ onVerify }: { onVerify(token: string | null): void }) {
    const handleChange = (token: string | null) => {
        onVerify(token);
    };

    return (
        <div>
            <ReCAPTCHA
                sitekey="6LfGJIErAAAAAGiaOsKFtOuET8MvxvuxsfWKaMeJ"
                onChange={handleChange}
            />
        </div>
    );
}
