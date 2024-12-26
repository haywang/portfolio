import {
  Menu,
  Search,
  Share,
  Mic,
  Upload,
  Globe,
  ThumbsUp,
  ThumbsDown,
  Copy,
  MoreHorizontal,
  ArrowDown,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ChatInterface() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r">
        <div className="p-4">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-4 overflow-y-auto p-4">
          <div className="space-y-2">
            <div className="font-medium">ChatGPT</div>
            <div className="font-medium">Explore GPTs</div>
          </div>

          <div className="pt-4">
            <div className="text-sm text-gray-500">Previous 7 Days</div>
            <div className="py-2">单元测试</div>
          </div>

          <div className="pt-4">
            <div className="text-sm">April</div>
            <div className="py-2">疑难杂症</div>
            <div className="py-2">助理工作建议</div>
          </div>

          <div className="pt-4">
            <div className="text-sm">March</div>
            <div className="py-2">GPT-3.5版本介绍</div>
          </div>

          <div className="pt-4">
            <div className="text-sm">2023</div>
            <div className="py-2">ChatGPT使用GPT-3.5架构。</div>
          </div>
        </nav>

        <div className="border-t p-4">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-violet-600" />
              Upgrade plan
            </div>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-500" />
            <span className="font-medium">ChatGPT</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Share className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-violet-600" />
          </div>
        </header>

        {/* Chat Content */}
        <div className="flex-1 space-y-6 overflow-y-auto p-4">
          <div className="space-y-4 rounded-lg bg-gray-50 p-4">
            <pre className="text-sm">
              &quot;15.1.0&quot; sec-fetch-dest: empty sec-fetch-mode: cors
              sec-fetch-site: same-origin user-agent: Mozilla/5.0 (Macintosh;
              Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)
              Chrome/131.0.0.0 Safari/537.36, 如何判断服务器用的是什么类型
            </pre>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-4">
                <p className="text-gray-800">
                  您提供的信息似乎是一段HTTP请求的原始数据，其中包含了一些头信息、响应数据和Cookie内容。这类数据据通常与调试API调用或网络请求相关。请您进一步明确要的帮助内容：
                </p>
                <ol className="list-inside list-decimal space-y-2">
                  <li>
                    解析请求/响应内容：是否需要我帮助分析这段HTTP请求的结构或某些特定字段？
                  </li>
                  <li>
                    解决特定问题：是否遇到某些错误或问题，需要根据这段信息排查？
                  </li>
                  <li>安全建议：是否担心数据泄露或其他安全问题？</li>
                  <li>其他用途：如果是用于其他目的，请具体说明。</li>
                </ol>
                <p className="text-gray-800">
                  根据您的需要，我可以进一步为您提供支持！
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pl-12">
              <Button variant="ghost" size="icon">
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ThumbsDown className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Message ChatGPT"
                className="w-full rounded-lg border p-4 pr-24 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <HelpCircle className="h-3 w-3" />
                ChatGPT can make mistakes. Check important info.
              </div>
              <Button variant="ghost" size="sm">
                <ArrowDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
