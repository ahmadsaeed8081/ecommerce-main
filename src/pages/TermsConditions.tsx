import Layout from "@/components/layout/Layout";

const TermsConditions = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Terms & Conditions</h1>
        
        <div className="prose prose-invert max-w-none">
          <div className="glass-card rounded-2xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using WLBIZ platform, you accept and agree to be bound by the terms 
                and conditions of this agreement. If you do not agree to these terms, please do not 
                use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Use of Services</h2>
              <p className="text-muted-foreground">
                You agree to use our platform only for lawful purposes and in accordance with these 
                terms. You are responsible for maintaining the security of your wallet and any 
                activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Cryptocurrency Transactions</h2>
              <p className="text-muted-foreground">
                All transactions on WLBIZ are conducted using cryptocurrency. You acknowledge that 
                cryptocurrency values can be volatile and you accept all risks associated with 
                crypto transactions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. WLBIZ Tokens</h2>
              <p className="text-muted-foreground">
                WLBIZ tokens earned through purchases are subject to the platform's reward rules. 
                We reserve the right to modify the token distribution mechanics with prior notice 
                to users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                WLBIZ shall not be liable for any indirect, incidental, special, consequential, or 
                punitive damages resulting from your use of or inability to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. We will notify users of any 
                material changes by posting the new terms on this page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditions;
