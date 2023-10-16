import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return ( 
    <div className="h-full p-4 flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-20">Settings</h3>
      <div className="text-muted-foreground text-lg mb-4">
        {isPro ? "You are currently on a Pro plan." : "You are currently on a free plan."}
      </div>
      <SubscriptionButton isPro={isPro} />
    </div>
   );
}
 
export default SettingsPage;
