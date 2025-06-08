export default function ProfilePage() {
  return (
    <div style={{ paddingTop: "var(--header-height)" }}>
      <div className="container-header">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <span className="text-4xl">👤</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">このサイトについて</h2>
              <p className="text-gray-600 mb-4">
                atepoyo.comは、atepoyoの個人ブログです。
                <br />
                日常のことについて書いています。
              </p>
              <br />
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">
                  興味のある分野
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>ウェブ開発</li>
                  <li>プログラミング</li>
                  <li>服</li>
                  <li>漫画</li>
                  <li>写真</li>
                  <li>音楽</li>
                  <li>ゲーム</li>
                </ul>
              </div>
              <br />
              <div>
                <h3 className="font-medium text-gray-700 mb-2">連絡先</h3>
                <p className="text-gray-600">
                  Email: natsuki.photo@gmail.com
                  <br />
                  Twitter: @atepoyo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
