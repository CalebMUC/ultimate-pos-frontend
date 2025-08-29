<template>
    <div class="flex min-h-screen">

            <aside class="w-1/4 bg-white p-6 shadow-md h-screen">
                <div class="flex flex-col items-center">
                    <div class="w-20 h-10 bg-gray-300 rounded-full"></div>
                    <h2 class="mt-4 text-lg font-semibold">{{ name }} </h2>
                    <p class="text-gray-500 text-sm">{{ email }}</p>
                </div>
                <nav class="mt-6">
                    <ul class="space-y-4">
                        <li :class="isActive ? 'text-orange-500 font-semibold text-md' : 'text-green-600 font-semibold px-4 py-2 hover:bg-gray-100 cursor-pointer'" @click="getPersonalInfo">Personal information</li>
                        <li class="font-semibold text-md":class="isActive ? 'text-orange-500' : 'text-green-600 px-4 py-2 hover:bg-gray-100 cursor-pointer'" @click="getBusinessInfo">Business Details</li>
                        <li class="font-semibold text-md":class="isActive ? 'text-orange-500' : 'text-green-600 px-4 py-2 hover:bg-gray-100 cursor-pointer'" @click="getTellerDetails">Teller Mgmt</li>
                        <li class="font-semibold text-md" :class="isActive ? 'text-orange-500' : 'text-green-600 px-4 py-2 hover:bg-gray-100 cursor-pointer'" @click="getRoles">Roles </li>
                        <li class="font-semibold text-md" :class="isActive ? 'text-orange-500' : 'text-green-600 px-4 py-2 hover:bg-gray-100 cursor-pointer'" @click="getPermissions">Permissions </li>               
                        <li class="font-semibold text-md":class="isActive ? 'text-orange-500' : 'text-green-600 px-4 py-2 hover:bg-gray-100 cursor-pointer'" @click="getUserLogs">Activities</li>
                        <!-- <li class="font-semibold text-md":class="isActive ? 'text-orange-500' : 'text-green-600 px-4 py-2 hover:bg-gray-100 cursor-pointer'" @click="getApiKey">Api Key</li> -->
                        <li class="font-semibold text-md":class="isActive ? 'text-orange-500' : 'text-green-600 px-4 py-2 hover:bg-gray-100 cursor-pointer'" @click="getSystemUsers">Users</li>
                    </ul>

                </nav> 
            </aside>

    
            <!-- SECTION ONE START  PERSONAL INFORMATION-->
            <section v-if="isopenPersnalInfo"  class="flex-1 p-10 w-3/4">
                <div class="flex justify-between items-center">
                    <h1 class="text-2xl font-semibold">Personal information</h1>
                    <button class="bg-orange-500 text-white px-4 py-2 rounded-lg" >Sign Out</button>
                </div>
                <p class="text-gray-500 mt-2">Manage your personal information, including phone numbers and email address.</p>
                
                <!-- Info Cards -->
                <div class="grid grid-cols-2 gap-6 mt-6">
                    <div class="bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm">Full Name</p>
                        <p class="text-lg font-semibold">{{ name }}</p>
                    </div>
                    <div class="bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm">Phone Number</p>
                        <p class="text-lg font-semibold">{{ phone }}</p>
                    </div>
                    <div class="bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm">Email Address</p>
                        <p class="text-lg font-semibold">{{ email }}</p>
                    </div>
                    <div class="bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm">User ID</p>
                        <p class="text-lg font-semibold">{{ userid }}</p>
                    </div>
                    <div class="col-span-2 bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm">Account Balance</p>
                        <p class="text-lg font-semibold">ikakodesign@gmail.com</p>
                    </div>
                </div>
            </section>


            <!-- SECTION TWO START  Business INFORMATION-->
            <section v-if="isopenBusinessInfo"  class="flex-1 p-10 w-3/4">
                <div class="flex justify-between items-center">
                    <h1 class="text-2xl font-semibold">Business Details</h1>
                    <button class="bg-orange-500 text-white px-4 py-2 rounded-lg" >Update Details</button>
                </div>
                <p class="text-gray-500 mt-2">Manage your Business information, here</p>
                
                <!-- Info Cards -->
                <div class="grid grid-cols-2 gap-6 mt-6">
                    <div class="bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm">Business Name </p>
                        <p class="text-lg font-semibold">{{ name }}</p>
                    </div>
                    <div class="bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm">Industry/Nature of Business</p>
                        <p class="text-lg font-semibold">{{ phone }}</p>
                    </div>
                    <div class="bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm">Physical Address</p>
                        <p class="text-lg font-semibold">{{ email }}</p>
                    </div>
                    <div class="bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm">Phone Number</p>
                        <p class="text-lg font-semibold">{{ userid }}</p>
                    </div> 

                     <div class="bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm">KRA PIN</p>
                        <p class="text-lg font-semibold">{{ email }}</p>
                    </div>
                    <div class="bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm">Number of Employees</p>
                        <p class="text-lg font-semibold">{{ userid }}</p>
                    </div> 


                     <div class="bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm">Mpesa Till </p>
                        <p class="text-lg font-semibold">{{ email }}</p>
                    </div>
                    <div class="bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm">Bank Account No</p>
                        <p class="text-lg font-semibold">{{ userid }}</p>
                    </div>

                    <div class="col-span-2 bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm">Business Email</p>
                        <p class="text-lg font-semibold">ikakodesign@gmail.com</p>
                    </div>
                </div>
            </section>

                    <!-- SECTION THAT CONTAINS TELLER DETALS -->
            <section v-if="IsopenTeller" class="w-3/4 p-6">
            <div class="flex justify-between items-center mb-3">
                <h1 class="text-2xl font-bold">Teller Management</h1>
                <span class="px-4 font-semibold">Date:  12/05/2025</span>
             </div> 
                  <!-- <p class="text-gray-500 mt-2">Manage your Teller information</p> -->

             <div class="bg-white rounded-lg shadow-lg p-1 mt-1">
                
                <!-- Info Cards -->
                <div class="grid grid-cols-2 gap-6 mt-1">
                    <div class="bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 font-semibold  text-sm">No of Cashiers/Users</p>
                        <p class="text-lg font-semibold">{{ 0 }}</p>
                    </div>
                    <div class="bg-white p-6 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm font-semibold ">Active Cashiers</p>
                        <p class="text-lg font-semibold">{{ 0 }}</p>
                    </div>
                    <div class="bg-white p-3 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm font-semibold"> Total Income Today </p>
                        <div class="p-2">
                        <p class="text-gray-500 text-sm"> Mpesa :  {{ 12 }}</p>
                        <p class="text-gray-500 text-sm"> Cash  : {{ 12 }}</p>
                        </div>
                    </div>
                    <div class="bg-white p-3 shadow-md rounded-lg">
                        <p class="text-gray-500 text-sm font-semibold"> Total Income </p>
                         <div class="p-2">
                          <p class="text-gray-500 text-sm"> Clear Balance :  {{ 12 }}</p>
                          <p class="text-gray-500 text-sm"> Opening Balance  : {{ 12 }}</p>
                         </div>
                    </div>
                </div> 
                </div>

                <div class="overflow-x-auto mt-3 rounded-sm">
                       <p class="text-black-500 mt-2 font-semibold p-1">Cashier List</p>
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-50 border-b">
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clear Balance</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opening Balance</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap">Admin</td>
                                <td class="px-6 py-4 whitespace-nowrap">12000</td>
                                <td class="px-6 py-4 whitespace-nowrap">12000</td>
                                <td class="px-6 py-4 whitespace-nowrap">2000</td>
                                <td class="px-6 py-4 whitespace-nowrap">Active</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex space-x-3">
                                        <button class="text-blue-600 hover:text-blue-800">Edit</button>
                                        <button class="text-red-600 hover:text-red-800">close</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </section>

            
            <!-- SECTION CONTAINs PERMISSIONS-->
          <section v-if="isopenPermissions" class="w-3/4 p-6">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold">Roles & Permissions</h1>
                <span class="px-4 font-semibold">Role:  ADMIN</span>
             </div> 

             <div class="bg-white rounded-lg shadow-lg p-6 mt-3">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-semibold text-gray-700">Permissions</h2>
                    <div class="relative">
                        <input type="text" placeholder="Search permissions..." class="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                </div>

                <div class="space-y-6">
                    <!-- User Management -->
                    <div class="border rounded-lg p-4">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-medium text-gray-900">User Management</h3>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Select All</span>
                            </label>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Create Users</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Edit Users</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Delete Users</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">View Users</span>
                            </label>
                        </div>
                    </div>

                    <!-- Content Management -->
                    <div class="border rounded-lg p-4">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-medium text-gray-900"> Contacts & Groups </h3>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Select All</span>
                            </label>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Add Contact</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Add  Coontact Group</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Delete Contact</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Delete Contact Group</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">View Contact</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">View Contact Group</span>
                            </label>

                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Edit Contact Group</span>
                            </label>

                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Edit Contact </span>
                            </label>

                        </div>
                    </div>

                    <!-- System Settings -->
                    <div class="border rounded-lg p-4">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-medium text-gray-900">SmS & CampaignS</h3>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Select All</span>
                            </label>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Send Sms</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">View Sent Messages</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Add Sms Template</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Edit Sms Template</span>
                            </label>

                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Delete Sms Template</span>
                            </label>

                        </div>
                    </div>

                    <!-- Reports section -->
                    <div class="border rounded-lg p-4">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-medium text-gray-900">Reports</h3>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Select All</span>
                            </label>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Generate Reports</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Preview Reports</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Print Reports</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Save Reports</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">View Reports</span>
                            </label>
                         
                        </div>
                    </div>


                </div>

                <div class="mt-6 flex justify-end space-x-4">
                    <button class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</button>
                    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save Changes</button>
                </div>

            </div>

            </section>

            <!-- SECTION CONTAINS ROLES -->
          <section v-if="isopenRoles" class="w-3/4 p-6">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold">Roles & Permissions</h1>
                <span class="px-4 font-semibold">Role:  {{role}}</span>
                <!-- <button class="bg-orange-500 text-white px-4 py-2 rounded-lg">Add Role</button> -->
             </div> 

             <!-- roles section -->
             <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-semibold text-gray-700">Roles</h2>
                    <div class="relative">
                        <input type="text" placeholder="Search roles..." class="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                </div>

                <div class="mb-6">
                    <div class="flex gap-4">
                        <input type="text" placeholder="New role name" class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Create Role</button>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-50 border-b">
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap">Admin</td>
                                <td class="px-6 py-4 whitespace-nowrap">12 permissions</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex space-x-3">
                                        <button class="text-blue-600 hover:text-blue-800">Edit</button>
                                        <button class="text-red-600 hover:text-red-800">Delete</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap">Editor</td>
                                <td class="px-6 py-4 whitespace-nowrap">8 permissions</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex space-x-3">
                                        <button class="text-blue-600 hover:text-blue-800">Edit</button>
                                        <button class="text-red-600 hover:text-red-800">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            </section>

           <!-- SECTION TO VIEW MY  TRANSACTIONS LOGS -->
          <section v-if="isopenTransactions" class="flex-1 p-10 w-3/4 rounded-lg bg-gray-200 Shadow-lg">
           <span class="text-2xl font-semibold px-5 text-center" >Activity Logs</span>

            <table class="min-w-full divide-y-2 divide-gray-200 bg-gray-100 mt-4 text-sm rounded">
              <thead class="ltr:text-left rtl:text-right">
               <tr>
                 <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
                 <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Module</th>
                 <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Time</th>
                 <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Request</th>
                 <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
                 <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Response</th>
                 <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
               </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 bg-white"> 
                <tr class="bg-white border-4 border-gray-200" v-for="(transaction, index) in data" :key="transaction.id">
                    <td class="py-3">{{ index + 1 }}.</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ transaction.campaignID }}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ transaction.SenderID }} </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ transaction.PhoneNo }}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ transaction.status }}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ transaction.createdat }} </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">..</td>
                 </tr>
               </tbody>
            </table>
             </section>

            <!--SECTION TO VIEW SYSTEM USERS  -->
         <section v-if="isSystemUser" class="flex-1 p-10 w-3/4 rounded-lg bg-gray-200 Shadow-lg">
           <span class="text-2xl font-semibold px-5 text-center" >System Users</span>
                <button class="bg-orange-500 text-white px-2 py-2 rounded-lg absolute right-5" @click="openRecargeAccountModal">Add User</button>

              <div class="bg-white rounded-lg shadow-lg p-6 mt-4">
                  <div class="flex justify-between items-center mb-6">
                      <h2 class="text-xl font-semibold text-gray-700">User details</h2>
                      <div class="relative">
                          <input type="text" placeholder="Search user..." class="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                          </svg>
                      </div>
                  </div>

                  <div class="overflow-x-auto">
                      <table class="w-full">
                          <thead>
                              <tr class="bg-gray-50 border-b">
                                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IsLogged In</th>
                                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</th>
                                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                              </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200">
                              <tr>
                                  <td class="px-6 py-4 whitespace-nowrap">Admin</td>
                                  <td class="px-6 py-4 whitespace-nowrap">12 permissions</td>
                                  <td class="px-6 py-4 whitespace-nowrap">
                                      <div class="flex space-x-3">
                                          <button class="text-blue-600 hover:text-blue-800">Edit</button>
                                          <button class="text-red-600 hover:text-red-800">Delete</button>
                                      </div>
                                   </td>
                                 </tr>
                            
                                </tbody>
                              </table>
                          </div>
                      </div>

                                              <!-- Add user modal -->

                <div v-if="isopenRechargeModal" class="flex  justify-center w-full relative h-content bg-gray-300 ">

                 <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full h-content mt-10 py-9">
                <div class="flex items-center justify-center gap-2">
                    <p class="text-md font-semibold uppercase tracking-widest text-gray-700 text-center">ADD USER</p>
                    <button @click="closeRechargeModal" class="bg-black text-white px-2 py-1 rounded">x</button>
                </div>


                   <form class=" md:space-y-6" action="#">

                  <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName</label>
                      <input v-model="Username"  type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </div>
               
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                      <input  v-model="Email" type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input  v-model="Password"  type="password"  placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>

             
                <div class="flex items-center  px-4 py-1 mt-4 ml-5">
                <a @click="uregister" class="w-3/4 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  
                    rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</a>
                </div>

                
                        
            </form>

            

               


                </div>
                </div>

              </section>

        

       



        </div>
    </template>



<script>
import {onMounted, computed,watch,ref} from 'vue'
import { Useuserstore } from '../store/userstore.js';
import { usesenderstore } from '../store/SenderIdStore.js'

export default {
   setup() { 

    const name = ref('');
    const email = ref('');
    const phone =  ref('');
    const userid = ref('');
    const EmailAddress =ref('');
    const Password=ref('');
    const isActive = ref(false);
    const Token=ref();
    const purpose = ref('');
    const isopenSenderIdModal = ref(false);



    const isopenPersnalInfo = ref(false);
    const isopenBusinessInfo = ref(false);
    const isopenRoles = ref(false);
    const isopenPermissions = ref(false);
    const isopenSenderID = ref(false);
    const isSystemUser = ref(false);
    const isopenTransactions = ref(false);
    const isopenRechargeModal = ref(false);
    const IsopenTeller = ref(false);
    const senderstore = usesenderstore(); 

    const contUserStore = Useuserstore();



    onMounted(()  =>{
        name.value = localStorage.getItem('name');
        email.value = localStorage.getItem('email');
        phone.value = localStorage.getItem('phone');
        userid.value = localStorage.getItem("userid");
        let token = localStorage.getItem("token");
        contUserStore.GetUserDetails(token,userid.value);

           getPersonalInfo();
    }); 


    const role = computed(() => contUserStore.getRole);
    const permissions = computed(() => contUserStore.getPermissions);

      watch(permissions, (newValue) => {
            filterPermissions(newValue);
        });


   const filterPermissions = (perm) => { 
       let search1 = "user";
        perm_Usermgmt.value =  perm.filter(item =>
           item.value.toLowerCase().includes(search1.toLowerCase))
    }

        
     
    const getPersonalInfo =  () =>{
        isActive.value = !isActive.value;
        isopenPersnalInfo.value = true;
         isopenBusinessInfo.value = false;
        isopenRoles .value = false;
        IsopenTeller.value = false;
        isopenSenderID.value = false; 
        isopenTransactions.value = false;
        isopenPermissions.value =false;
        isSystemUser.value = false;
    } 



    const getBusinessInfo = () =>{

           isActive.value = !isActive.value;
           isopenBusinessInfo.value = true;
        isopenPersnalInfo.value = false;
        isopenRoles .value = false;
         IsopenTeller.value = false;
        isopenSenderID.value = false; 
        isopenTransactions.value = false;
        isopenPermissions.value =false;
        isSystemUser.value = false;
    }

    const getTellerDetails =() =>{
          isActive.value = !isActive.value;
          IsopenTeller.value = true;
        isopenBusinessInfo.value = false;
        isopenPersnalInfo.value = false;
        isopenRoles .value = false;
        isopenSenderID.value = false; 
        isopenTransactions.value = false;
        isopenPermissions.value =false;
        isSystemUser.value = false;
    }


    const getRoles = () => {
        isActive.value = !isActive.value;
        isopenRoles.value = true;
         IsopenTeller.value = false;
        isopenBusinessInfo.value = false;
        isopenPersnalInfo .value= false;
        isopenSenderID.value = false; 
        isopenTransactions.value = false;
        isopenPermissions.value =false;
        isSystemUser.value = false;

        
    }

  

    const getPermissions = () => {

       isActive.value = !isActive.value;
       isopenPermissions.value =true;
       IsopenTeller.value = false;
        isopenBusinessInfo.value = false;
        isopenRoles.value = false;
        isopenPersnalInfo .value= false;
        isopenSenderID.value = false; 
        isopenTransactions.value = false;
        isSystemUser.value = false;


     }

    


    const getSystemUsers = () => {

      isActive.value = !isActive.value;
      isSystemUser.value = true;
      IsopenTeller.value = false;
      isopenBusinessInfo.value = false;
      isopenPermissions.value =false;
      isopenPersnalInfo .value= false;
      isopenRoles .value = false;
      isopenSenderID.value = false; 
      isopenTransactions.value = false;
    } 

    

    const getUserLogs = () => { 
        isopenTransactions.value = true;
        isopenBusinessInfo.value = false;
        IsopenTeller.value = false;
        isopenPersnalInfo.value = false;
        isopenRoles .value = false;
        isopenSenderID.value = false; 
        isSystemUser.value = false;
        isopenPermissions.value =false;

     }




    const generateToken = () =>{
        const payload ={
                email: EmailAddress.value,
                password: Password.value
                }
        contUserStore.GetToken(payload);     
      }



//   watch(mytoken, (newValue) => {
//     Token.value = newValue;
//    });
      
   const AddSenderID = () => {
        axios.addNewSenderID(Token.value, {
            value: senderid.value,
            purpose: purpose.value,
            amountpaid: paidamount.value,
            status: 1
          })
          .then((response) => {
            closeModal();
            showSuccessAlert();
            senderstore.fetchSenderID();
          })
          .catch((error) => {
            showErrorAlert();
          });
      };
  
      const openSenderModal = () => {
        isopenSenderIdModal.value = true;
      };
      
      const closeModal = () => {
        isopenSenderIdModal.value = false;
      };

      const openRecargeAccountModal = () => {
        isopenRechargeModal.value = true;
      } 

      const closeRechargeModal = () => {
        isopenRechargeModal.value = false;

      }

     

  
   
   return {
    getRoles,
    getPermissions,
    getPersonalInfo,
    getUserLogs,
    isopenPersnalInfo,
    isopenRoles ,
    IsopenTeller,
    getTellerDetails,
    isopenBusinessInfo,
    isopenSenderID ,
    isopenSenderIdModal,
    closeRechargeModal,
    AddSenderID,
    openSenderModal,
    closeModal,
    isSystemUser,
    getSystemUsers,
    isopenTransactions,
    isopenRechargeModal,
    isopenPermissions,
    openRecargeAccountModal,
    permissions,
    role,
    userid,
    filterPermissions,
    getBusinessInfo,
       
      name,
      email,
      phone,
      generateToken,
      EmailAddress,
      Password,
      Token,

     // apiauth
    //   CreateToken,
    //   
    //   showEdit,

   };
 }
}


</script>