import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import FormSection from '../components/FormSection';
import About from '../components/About';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div className="font-sans antialiased text-neutral-sage bg-background-light selection:bg-secondary selection:text-white">
            <Header />
            <main>
                <Hero />
                <Features />
                <FormSection />
                <About />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
