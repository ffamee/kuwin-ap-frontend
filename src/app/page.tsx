import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen overflow-y-auto">
      <section className="relative bg-green-200">
        <div className="container mx-auto px-4 py-12 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              KUwin: Kasetsart University Wireless Network
            </h1>
            <p className="text-l text-muted-foreground/90 mb-8">
              มหาวิทยาลัยเกษตรศาสตร์ ได้เปิดให้บริการ ไวร์เลสแลนอย่างเป็นทางการ
              ให้กับนิสิตและบุคลากร ของมหาวิทยาลัยในชื่อโครงการ KUWiN (Kasetsart
              University Wireless Network) เพื่อสนับสนุนนโยบาย
              การใช้เทคโนโลยีสารสนเทศ ของมหาวิทยาลัย
              โดยเปิดโอกาสให้กับนิสิตและบุคคลากรได้ใช้คอมพิวเตอร์
              กับระบบเครือข่ายมากขึ้น
            </p>
          </div>
        </div>
      </section>
      <div className="bg-muted/70 grid grid-cols-4 items-center-safe">
        <section className="py-16 col-span-3">
          <div className="max-w-4xl mx-auto grid grid-cols-4 gap-4">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle>Register</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle>
                  <Link href={"/monitor"}>Monitor</Link>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle>Device</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </section>
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-center mb-4">
              Your KUWiN Connection
            </h2>
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Connection Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between p-1 bg-muted/50 rounded-lg">
                      <span className="font-medium ">Your IP:</span>
                      <span className="font-mono text-primary"></span>
                    </div>
                    <div className="flex items-center justify-between p-1 bg-muted/50 rounded-lg">
                      <span className="font-medium ">AP Name:</span>
                      <span className="font-mono text-primary"></span>
                    </div>
                    <div className="flex items-center justify-between p-1 bg-muted/50 rounded-lg">
                      <span className="font-medium ">Location:</span>
                      <span className="font-mono text-primary"></span>
                    </div>
                    <div className="flex items-center justify-between p-1 bg-muted/50 rounded-lg">
                      <span className="font-medium ">Client Protocol:</span>
                      <span className="font-mono text-primary"></span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Office of Computer Service Kasetsart University Tel.02-5620951-6
            Att. 2501
          </p>
        </div>
      </footer>
    </div>
  );
}
