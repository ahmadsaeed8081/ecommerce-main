import Layout from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <div className="glass-card rounded-2xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information you provide directly to us, such as when you create an account, 
                make a purchase, or contact us for support. This may include your wallet address, 
                transaction history, and communication preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect to provide, maintain, and improve our services, 
                process transactions, send you technical notices and support messages, and respond 
                to your comments and questions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. Your wallet 
                data is encrypted and stored securely.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Blockchain Transactions</h2>
              <p className="text-muted-foreground">
                Please note that blockchain transactions are public by nature. While we protect 
                your personal information, transaction data on the blockchain is visible to anyone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us through 
                our official channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
