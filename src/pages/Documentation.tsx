
import React from 'react';
import AppHeader from '@/components/AppHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 container py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Documentation</h1>
        
        <Tabs defaultValue="architecture" className="w-full">
          <TabsList className="mb-6 w-full justify-start overflow-x-auto">
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="usecases">Use Cases</TabsTrigger>
            <TabsTrigger value="statechart">State Chart</TabsTrigger>
            <TabsTrigger value="activitychart">Activity Chart</TabsTrigger>
            <TabsTrigger value="technology">Technology Stack</TabsTrigger>
          </TabsList>
          
          <TabsContent value="architecture" className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">System Architecture</h2>
              <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                {/* UML-style architecture diagram */}
                <div className="flex flex-col items-center">
                  {/* Client/Frontend Layer */}
                  <div className="border-2 border-blue-500 p-4 rounded-lg mb-4 bg-blue-50 dark:bg-blue-900/20 w-full max-w-xl">
                    <h3 className="text-lg font-medium mb-2 text-center border-b border-blue-300 pb-2">Frontend Layer</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="border border-blue-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        React Components
                      </div>
                      <div className="border border-blue-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        React Router
                      </div>
                      <div className="border border-blue-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Context API
                      </div>
                      <div className="border border-blue-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Tailwind CSS
                      </div>
                    </div>
                  </div>

                  {/* Arrow down */}
                  <div className="w-20 h-10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  {/* API Layer */}
                  <div className="border-2 border-purple-500 p-4 rounded-lg mb-4 bg-purple-50 dark:bg-purple-900/20 w-full max-w-xl">
                    <h3 className="text-lg font-medium mb-2 text-center border-b border-purple-300 pb-2">API Layer</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="border border-purple-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        React Query
                      </div>
                      <div className="border border-purple-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Supabase Client
                      </div>
                      <div className="border border-purple-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Authentication
                      </div>
                      <div className="border border-purple-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Data Fetching
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow down */}
                  <div className="w-20 h-10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  {/* Backend Layer */}
                  <div className="border-2 border-green-500 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 w-full max-w-xl">
                    <h3 className="text-lg font-medium mb-2 text-center border-b border-green-300 pb-2">Supabase Backend</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="border border-green-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        PostgreSQL Database
                      </div>
                      <div className="border border-green-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Auth Services
                      </div>
                      <div className="border border-green-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Storage Buckets
                      </div>
                      <div className="border border-green-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Realtime Subscriptions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="usecases" className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Use Case Diagram</h2>
              <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-900 overflow-auto">
                <div className="min-w-[800px] min-h-[600px] relative">
                  {/* UML Use Case Diagram */}
                  
                  {/* Actor: Regular User */}
                  <div className="absolute left-16 top-1/3">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full border-2 border-black"></div>
                      <div className="h-20 w-0.5 bg-black mx-auto"></div>
                      <div className="w-12 rotate-45 h-0.5 bg-black absolute top-[58px] left-[13px]"></div>
                      <div className="w-12 -rotate-45 h-0.5 bg-black absolute top-[58px] right-[13px]"></div>
                      <div className="h-16 w-0.5 bg-black mx-auto"></div>
                      <div className="w-8 rotate-30 h-0.5 bg-black absolute top-[95px] left-[10px]"></div>
                      <div className="w-8 -rotate-30 h-0.5 bg-black absolute top-[95px] right-[10px]"></div>
                      <div className="mt-2 text-center">Pet Adopter</div>
                    </div>
                  </div>
                  
                  {/* Actor: Admin User */}
                  <div className="absolute right-16 top-1/3">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full border-2 border-black"></div>
                      <div className="h-20 w-0.5 bg-black mx-auto"></div>
                      <div className="w-12 rotate-45 h-0.5 bg-black absolute top-[58px] left-[13px]"></div>
                      <div className="w-12 -rotate-45 h-0.5 bg-black absolute top-[58px] right-[13px]"></div>
                      <div className="h-16 w-0.5 bg-black mx-auto"></div>
                      <div className="w-8 rotate-30 h-0.5 bg-black absolute top-[95px] left-[10px]"></div>
                      <div className="w-8 -rotate-30 h-0.5 bg-black absolute top-[95px] right-[10px]"></div>
                      <div className="mt-2 text-center">Pet Owner</div>
                    </div>
                  </div>
                  
                  {/* Use Case: Browse Pets */}
                  <div className="absolute left-[180px] top-[60px]">
                    <div className="w-40 h-14 bg-yellow-100 border border-black rounded-full flex items-center justify-center">
                      <span className="text-sm">Browse Pets</span>
                    </div>
                    <svg className="absolute -left-[75px] top-[20px]" width="75" height="10">
                      <line x1="0" y1="5" x2="75" y2="5" stroke="black" strokeWidth="1" />
                    </svg>
                  </div>
                  
                  {/* Use Case: View Pet Details */}
                  <div className="absolute left-[180px] top-[120px]">
                    <div className="w-40 h-14 bg-yellow-100 border border-black rounded-full flex items-center justify-center">
                      <span className="text-sm">View Pet Details</span>
                    </div>
                    <svg className="absolute -left-[75px] top-[20px]" width="75" height="10">
                      <line x1="0" y1="5" x2="75" y2="5" stroke="black" strokeWidth="1" />
                    </svg>
                  </div>
                  
                  {/* Use Case: Save Favorites */}
                  <div className="absolute left-[180px] top-[180px]">
                    <div className="w-40 h-14 bg-yellow-100 border border-black rounded-full flex items-center justify-center">
                      <span className="text-sm">Save Favorites</span>
                    </div>
                    <svg className="absolute -left-[75px] top-[20px]" width="75" height="10">
                      <line x1="0" y1="5" x2="75" y2="5" stroke="black" strokeWidth="1" />
                    </svg>
                  </div>
                  
                  {/* Use Case: Submit Adoption */}
                  <div className="absolute left-[180px] top-[240px]">
                    <div className="w-40 h-14 bg-yellow-100 border border-black rounded-full flex items-center justify-center">
                      <span className="text-sm">Submit Adoption Request</span>
                    </div>
                    <svg className="absolute -left-[75px] top-[20px]" width="75" height="10">
                      <line x1="0" y1="5" x2="75" y2="5" stroke="black" strokeWidth="1" />
                    </svg>
                  </div>
                  
                  {/* Use Case: Contact Owner */}
                  <div className="absolute left-[180px] top-[300px]">
                    <div className="w-40 h-14 bg-yellow-100 border border-black rounded-full flex items-center justify-center">
                      <span className="text-sm">Contact Pet Owner</span>
                    </div>
                    <svg className="absolute -left-[75px] top-[20px]" width="75" height="10">
                      <line x1="0" y1="5" x2="75" y2="5" stroke="black" strokeWidth="1" />
                    </svg>
                  </div>
                  
                  {/* Central Use Case: Select Pet */}
                  <div className="absolute left-[350px] top-[160px]">
                    <div className="w-40 h-14 bg-yellow-100 border border-black rounded-full flex items-center justify-center z-10">
                      <span className="text-sm">Select Pet</span>
                    </div>
                    
                    {/* Include relationships */}
                    <svg className="absolute top-[35px] -left-[130px]" width="130" height="100">
                      <line x1="0" y1="25" x2="130" y2="0" stroke="black" strokeWidth="1" strokeDasharray="4" />
                      <text x="50" y="30" className="text-[8px]">&lt;&lt;include&gt;&gt;</text>
                    </svg>
                    
                    <svg className="absolute top-[55px] -left-[130px]" width="130" height="100">
                      <line x1="0" y1="65" x2="130" y2="0" stroke="black" strokeWidth="1" strokeDasharray="4" />
                      <text x="50" y="50" className="text-[8px]">&lt;&lt;include&gt;&gt;</text>
                    </svg>
                    
                    <svg className="absolute top-[85px] -left-[130px]" width="130" height="100">
                      <line x1="0" y1="95" x2="130" y2="0" stroke="black" strokeWidth="1" strokeDasharray="4" />
                      <text x="50" y="70" className="text-[8px]">&lt;&lt;include&gt;&gt;</text>
                    </svg>
                  </div>
                  
                  {/* Use Case: List Pet */}
                  <div className="absolute right-[180px] top-[120px]">
                    <div className="w-40 h-14 bg-yellow-100 border border-black rounded-full flex items-center justify-center">
                      <span className="text-sm">List Pet for Adoption</span>
                    </div>
                    <svg className="absolute -right-[75px] top-[20px]" width="75" height="10">
                      <line x1="0" y1="5" x2="75" y2="5" stroke="black" strokeWidth="1" />
                    </svg>
                  </div>
                  
                  {/* Use Case: Update Pet Info */}
                  <div className="absolute right-[180px] top-[180px]">
                    <div className="w-40 h-14 bg-yellow-100 border border-black rounded-full flex items-center justify-center">
                      <span className="text-sm">Update Pet Information</span>
                    </div>
                    <svg className="absolute -right-[75px] top-[20px]" width="75" height="10">
                      <line x1="0" y1="5" x2="75" y2="5" stroke="black" strokeWidth="1" />
                    </svg>
                  </div>
                  
                  {/* Use Case: Manage Requests */}
                  <div className="absolute right-[180px] top-[240px]">
                    <div className="w-40 h-14 bg-yellow-100 border border-black rounded-full flex items-center justify-center">
                      <span className="text-sm">Manage Adoption Requests</span>
                    </div>
                    <svg className="absolute -right-[75px] top-[20px]" width="75" height="10">
                      <line x1="0" y1="5" x2="75" y2="5" stroke="black" strokeWidth="1" />
                    </svg>
                    
                    {/* Include relationship to central use case */}
                    <svg className="absolute top-[0px] -left-[130px]" width="130" height="100">
                      <line x1="0" y1="0" x2="130" y2="80" stroke="black" strokeWidth="1" strokeDasharray="4" />
                      <text x="30" y="50" className="text-[8px]">&lt;&lt;include&gt;&gt;</text>
                    </svg>
                  </div>
                  
                  {/* Use Case: Delete Pet */}
                  <div className="absolute right-[180px] top-[300px]">
                    <div className="w-40 h-14 bg-yellow-100 border border-black rounded-full flex items-center justify-center">
                      <span className="text-sm">Delete Pet Listing</span>
                    </div>
                    <svg className="absolute -right-[75px] top-[20px]" width="75" height="10">
                      <line x1="0" y1="5" x2="75" y2="5" stroke="black" strokeWidth="1" />
                    </svg>
                    
                    {/* Include relationship to central use case */}
                    <svg className="absolute top-[0px] -left-[130px]" width="130" height="100">
                      <line x1="0" y1="0" x2="130" y2="140" stroke="black" strokeWidth="1" strokeDasharray="4" />
                      <text x="30" y="70" className="text-[8px]">&lt;&lt;include&gt;&gt;</text>
                    </svg>
                  </div>
                  
                  {/* Use Case: Login */}
                  <div className="absolute right-[180px] top-[60px]">
                    <div className="w-40 h-14 bg-yellow-100 border border-black rounded-full flex items-center justify-center">
                      <span className="text-sm">Login To System</span>
                    </div>
                    <svg className="absolute -right-[75px] top-[20px]" width="75" height="10">
                      <line x1="0" y1="5" x2="75" y2="5" stroke="black" strokeWidth="1" />
                    </svg>
                    
                    {/* Include relationship to central use case */}
                    <svg className="absolute top-[50px] -left-[130px]" width="130" height="100">
                      <line x1="0" y1="0" x2="130" y2="50" stroke="black" strokeWidth="1" strokeDasharray="4" />
                      <text x="30" y="30" className="text-[8px]">&lt;&lt;include&gt;&gt;</text>
                    </svg>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="statechart" className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">State Chart</h2>
              <div className="border p-6 rounded-lg bg-white dark:bg-gray-800 overflow-x-auto">
                <div className="min-w-[700px]">
                  <h3 className="text-lg font-medium mb-6 text-center">Pet Adoption Process State Chart</h3>
                  
                  {/* UML State Chart */}
                  <div className="flex flex-col items-center">
                    {/* Initial State */}
                    <div className="w-4 h-4 rounded-full bg-black"></div>
                    <div className="h-6 border-l border-black"></div>
                    
                    {/* Available State */}
                    <div className="border-2 border-gray-400 rounded-lg p-3 w-40 text-center mb-6">
                      <div className="font-medium">Available</div>
                    </div>
                    
                    {/* Transition Arrow */}
                    <div className="flex flex-col items-center">
                      <div className="h-6 border-l border-black"></div>
                      <div className="text-xs text-gray-500 mb-1">[User Submits Request]</div>
                      <div className="h-6 border-l border-black"></div>
                    </div>
                    
                    {/* Request Pending State */}
                    <div className="border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 w-44 text-center mb-6">
                      <div className="font-medium">Request Pending</div>
                    </div>
                    
                    {/* Decision Fork */}
                    <div className="flex flex-col items-center">
                      <div className="h-6 border-l border-black"></div>
                      <div className="w-40 border-b-2 border-black"></div>
                    </div>
                    
                    {/* Rejected and Approved States */}
                    <div className="flex gap-40 mb-6">
                      <div className="flex flex-col items-center">
                        <div className="h-6 border-l border-black"></div>
                        <div className="text-xs text-gray-500 mb-1">[Owner Rejects]</div>
                        <div className="h-6 border-l border-black"></div>
                        <div className="border-2 border-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 w-40 text-center">
                          <div className="font-medium">Rejected</div>
                        </div>
                        <div className="h-6 border-l border-black"></div>
                        <svg className="w-16 h-8" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 16H30C30 8 60 8 60 16H64" stroke="black" strokeWidth="1"/>
                          <path d="M60 16L52 12V20L60 16Z" fill="black"/>
                        </svg>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="h-6 border-l border-black"></div>
                        <div className="text-xs text-gray-500 mb-1">[Owner Approves]</div>
                        <div className="h-6 border-l border-black"></div>
                        <div className="border-2 border-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 w-40 text-center">
                          <div className="font-medium">Approved</div>
                        </div>
                        <div className="h-6 border-l border-black"></div>
                        <div className="h-6 border-l border-black"></div>
                        <div className="text-xs text-gray-500 mb-1">[Process Complete]</div>
                        <div className="h-6 border-l border-black"></div>
                        <div className="border-2 border-gray-400 rounded-lg p-3 w-40 text-center">
                          <div className="font-medium">Adopted</div>
                        </div>
                        <div className="h-6 border-l border-black"></div>
                        <div className="w-4 h-4 rounded-full bg-black border-4 border-white dark:border-gray-800"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="activitychart" className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Activity Chart</h2>
              <div className="border p-6 rounded-lg bg-white dark:bg-gray-800 overflow-x-auto">
                <div className="min-w-[700px]">
                  <h3 className="text-lg font-medium mb-6 text-center">Pet Adoption Activity Flow</h3>
                  
                  {/* UML Activity Diagram */}
                  <div className="flex flex-col items-center">
                    {/* Start Node */}
                    <div className="w-16 h-16 rounded-full bg-black mb-4"></div>
                    <div className="h-8 border-l-2 border-black"></div>
                    
                    <div className="flex gap-36">
                      {/* User Activities */}
                      <div className="flex flex-col items-center">
                        <div className="border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 w-48 text-center mb-4">
                          <div className="font-medium">User Browses Pets</div>
                        </div>
                        <div className="h-8 border-l-2 border-black"></div>
                        <div className="border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 w-48 text-center mb-4">
                          <div className="font-medium">User Views Pet Details</div>
                        </div>
                        <div className="h-8 border-l-2 border-black"></div>
                        <div className="border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 w-48 text-center mb-4">
                          <div className="font-medium">Submit Adoption Form</div>
                        </div>
                        <div className="h-8 border-l-2 border-black"></div>
                        <svg className="w-48 h-8" viewBox="0 0 192 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M96 0V32" stroke="black" strokeWidth="2"/>
                          <path d="M0 32H192" stroke="black" strokeWidth="2"/>
                        </svg>
                      </div>
                      
                      {/* Owner Activities */}
                      <div className="flex flex-col items-center mt-32">
                        <div className="h-8 border-l-2 border-black"></div>
                        <div className="border-2 border-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 w-48 text-center mb-4">
                          <div className="font-medium">Owner Reviews Request</div>
                        </div>
                        <div className="h-8 border-l-2 border-black"></div>
                        
                        {/* Decision Diamond */}
                        <div className="w-16 h-16 border-2 border-black rotate-45 mb-6"></div>
                        
                        {/* Fork for Approved/Rejected */}
                        <div className="flex gap-24">
                          <div className="flex flex-col items-center">
                            <div className="h-8 border-l-2 border-black"></div>
                            <div className="text-xs text-gray-500 mb-1">[Rejected]</div>
                            <div className="h-4 border-l-2 border-black"></div>
                            <div className="border-2 border-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 w-40 text-center">
                              <div className="font-medium">Adoption Rejected</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <div className="h-8 border-l-2 border-black"></div>
                            <div className="text-xs text-gray-500 mb-1">[Approved]</div>
                            <div className="h-4 border-l-2 border-black"></div>
                            <div className="border-2 border-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 w-40 text-center mb-4">
                              <div className="font-medium">Adoption Approved</div>
                            </div>
                            <div className="h-8 border-l-2 border-black"></div>
                            <div className="border-2 border-gray-400 rounded-lg p-3 w-40 text-center mb-4">
                              <div className="font-medium">Pet Adoption Finalized</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Join to End Node */}
                    <div className="mt-8">
                      <svg className="w-48 h-8" viewBox="0 0 192 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M96 0V32" stroke="black" strokeWidth="2"/>
                        <path d="M0 0H192" stroke="black" strokeWidth="2"/>
                      </svg>
                      <div className="h-8 border-l-2 border-black ml-24"></div>
                      <div className="w-16 h-16 rounded-full bg-black border-4 border-white dark:border-gray-800 ml-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="technology" className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">RN</span>
                    </span>
                    React Native
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Cross-platform mobile application framework that enables native mobile app development using React and JavaScript.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">TS</span>
                    </span>
                    TypeScript
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Superset of JavaScript that adds static type definitions, enhancing code quality and developer experience for mobile development.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">TW</span>
                    </span>
                    Tailwind CSS
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">RQ</span>
                    </span>
                    React Query
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Data fetching library for React Native that simplifies server state management, caching, and updates in mobile apps.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">SB</span>
                    </span>
                    Supabase
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Open-source Firebase alternative with PostgreSQL database, authentication, storage, and realtime features for mobile backends.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">RN</span>
                    </span>
                    React Navigation
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Navigation library for React Native that provides stack, tab, and drawer navigation patterns for mobile apps.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">E</span>
                    </span>
                    Expo
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Platform for universal React applications that provides tools and services for React Native development and deployment.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">AS</span>
                    </span>
                    AsyncStorage
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Asynchronous, persistent, key-value storage system for React Native applications, used for local data persistence.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">RHF</span>
                    </span>
                    React Hook Form
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Performant forms library for React Native with easy validation and minimal re-renders for mobile form handling.</p>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Documentation;
