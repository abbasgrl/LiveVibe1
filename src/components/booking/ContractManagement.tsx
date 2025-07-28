import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  Send, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Edit,
  Eye,
  Signature,
  Shield,
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  DollarSign
} from 'lucide-react';
import { format } from 'date-fns';

interface Contract {
  id: string;
  bookingId: string;
  eventName: string;
  artistName: string;
  clientName: string;
  clientEmail: string;
  eventDate: Date;
  venue: string;
  amount: number;
  status: 'draft' | 'sent' | 'signed' | 'completed' | 'expired';
  createdDate: Date;
  sentDate?: Date;
  signedDate?: Date;
  expiryDate?: Date;
  templateType: 'standard' | 'wedding' | 'corporate' | 'festival';
  terms: string;
  artistSigned: boolean;
  clientSigned: boolean;
}

interface ContractTemplate {
  id: string;
  name: string;
  type: 'standard' | 'wedding' | 'corporate' | 'festival';
  description: string;
  content: string;
  lastModified: Date;
}

const mockContracts: Contract[] = [
  {
    id: '1',
    bookingId: 'BK001',
    eventName: 'Summer Music Festival',
    artistName: 'Luna Martinez',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@musicfest.com',
    eventDate: new Date('2024-07-15'),
    venue: 'Central Park Amphitheater',
    amount: 10000,
    status: 'signed',
    createdDate: new Date('2024-01-10'),
    sentDate: new Date('2024-01-11'),
    signedDate: new Date('2024-01-12'),
    templateType: 'festival',
    terms: 'Standard festival performance agreement with technical rider',
    artistSigned: true,
    clientSigned: true
  },
  {
    id: '2',
    bookingId: 'BK002',
    eventName: 'Corporate Gala',
    artistName: 'Marcus Thunder',
    clientName: 'Michael Chen',
    clientEmail: 'michael@techcorp.com',
    eventDate: new Date('2024-06-20'),
    venue: 'Grand Ballroom',
    amount: 8000,
    status: 'sent',
    createdDate: new Date('2024-01-15'),
    sentDate: new Date('2024-01-16'),
    expiryDate: new Date('2024-02-16'),
    templateType: 'corporate',
    terms: 'Corporate event performance with dress code requirements',
    artistSigned: true,
    clientSigned: false
  },
  {
    id: '3',
    bookingId: 'BK003',
    eventName: 'Wedding Reception',
    artistName: 'Indie Collective',
    clientName: 'Emily Rodriguez',
    clientEmail: 'emily@email.com',
    eventDate: new Date('2024-08-10'),
    venue: 'Seaside Resort',
    amount: 5000,
    status: 'draft',
    createdDate: new Date('2024-01-20'),
    templateType: 'wedding',
    terms: 'Wedding reception performance with special song requests',
    artistSigned: false,
    clientSigned: false
  }
];

const mockTemplates: ContractTemplate[] = [
  {
    id: '1',
    name: 'Standard Performance Agreement',
    type: 'standard',
    description: 'General performance contract for most events',
    content: 'Standard terms and conditions...',
    lastModified: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Wedding Performance Contract',
    type: 'wedding',
    description: 'Specialized contract for wedding events',
    content: 'Wedding-specific terms...',
    lastModified: new Date('2024-01-05')
  },
  {
    id: '3',
    name: 'Corporate Event Agreement',
    type: 'corporate',
    description: 'Professional contract for corporate events',
    content: 'Corporate event terms...',
    lastModified: new Date('2024-01-10')
  },
  {
    id: '4',
    name: 'Festival Performance Contract',
    type: 'festival',
    description: 'Contract for festival and large venue performances',
    content: 'Festival performance terms...',
    lastModified: new Date('2024-01-15')
  }
];

export function ContractManagement() {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [templates] = useState<ContractTemplate[]>(mockTemplates);
  const [selectedTab, setSelectedTab] = useState('contracts');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'signed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Edit className="h-4 w-4" />;
      case 'sent': return <Send className="h-4 w-4" />;
      case 'signed': return <CheckCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'expired': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.artistName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && contract.status === statusFilter;
  });

  const handleSendContract = (contractId: string) => {
    setContracts(prev => prev.map(contract => 
      contract.id === contractId 
        ? { ...contract, status: 'sent', sentDate: new Date(), expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
        : contract
    ));
    
    toast({
      title: "Contract Sent",
      description: "The contract has been sent to the client for signature.",
    });
  };

  const handleSignContract = (contractId: string, signedBy: 'artist' | 'client') => {
    setContracts(prev => prev.map(contract => {
      if (contract.id === contractId) {
        const updated = { ...contract };
        if (signedBy === 'artist') {
          updated.artistSigned = true;
        } else {
          updated.clientSigned = true;
        }
        
        if (updated.artistSigned && updated.clientSigned) {
          updated.status = 'signed';
          updated.signedDate = new Date();
        }
        
        return updated;
      }
      return contract;
    }));
    
    toast({
      title: "Contract Signed",
      description: `Contract has been signed by ${signedBy}.`,
    });
  };

  const getContractCounts = () => {
    return {
      all: contracts.length,
      draft: contracts.filter(c => c.status === 'draft').length,
      sent: contracts.filter(c => c.status === 'sent').length,
      signed: contracts.filter(c => c.status === 'signed').length,
      expired: contracts.filter(c => c.status === 'expired').length
    };
  };

  const counts = getContractCounts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contract Management</h2>
          <p className="text-gray-600">Manage contracts, templates, and digital signatures</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="signed">Signed</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Contract
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-gray-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{counts.all}</p>
            <p className="text-sm text-gray-600">Total Contracts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Edit className="h-6 w-6 text-gray-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{counts.draft}</p>
            <p className="text-sm text-gray-600">Drafts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Send className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{counts.sent}</p>
            <p className="text-sm text-gray-600">Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{counts.signed}</p>
            <p className="text-sm text-gray-600">Signed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{counts.expired}</p>
            <p className="text-sm text-gray-600">Expired</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          {filteredContracts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No contracts found</h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Try adjusting your search terms' : 'Create your first contract to get started'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredContracts.map((contract) => (
                <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{contract.eventName}</h3>
                            <p className="text-gray-600">{contract.artistName} • {contract.clientName}</p>
                          </div>
                          <Badge className={`${getStatusColor(contract.status)} flex items-center gap-1`}>
                            {getStatusIcon(contract.status)}
                            {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{format(contract.eventDate, 'MMM dd, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="h-4 w-4" />
                            <span>{contract.clientEmail}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <DollarSign className="h-4 w-4" />
                            <span>${contract.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <FileText className="h-4 w-4" />
                            <span className="capitalize">{contract.templateType}</span>
                          </div>
                        </div>

                        {/* Signature Status */}
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${contract.artistSigned ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <span className={contract.artistSigned ? 'text-green-600' : 'text-gray-500'}>
                              Artist {contract.artistSigned ? 'Signed' : 'Pending'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${contract.clientSigned ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <span className={contract.clientSigned ? 'text-green-600' : 'text-gray-500'}>
                              Client {contract.clientSigned ? 'Signed' : 'Pending'}
                            </span>
                          </div>
                        </div>

                        {contract.expiryDate && contract.status === 'sent' && (
                          <div className="bg-yellow-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 text-yellow-800">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">
                                Expires: {format(contract.expiryDate, 'MMM dd, yyyy')}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 min-w-[140px]">
                        <Button size="sm" variant="outline" className="w-full">
                          <Eye className="mr-2 h-4 w-4" />
                          View Contract
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                        
                        {contract.status === 'draft' && (
                          <Button 
                            size="sm" 
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleSendContract(contract.id)}
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Send Contract
                          </Button>
                        )}
                        
                        {contract.status === 'sent' && !contract.artistSigned && (
                          <Button 
                            size="sm" 
                            className="w-full bg-green-600 hover:bg-green-700"
                            onClick={() => handleSignContract(contract.id, 'artist')}
                          >
                            <Signature className="mr-2 h-4 w-4" />
                            Sign as Artist
                          </Button>
                        )}
                        
                        {contract.status === 'sent' && contract.artistSigned && !contract.clientSigned && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full"
                            onClick={() => handleSignContract(contract.id, 'client')}
                          >
                            <Signature className="mr-2 h-4 w-4" />
                            Sign as Client
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Contract Templates</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-semibold">{template.name}</h4>
                        <p className="text-gray-600 text-sm">{template.description}</p>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {template.type}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      Last modified: {format(template.lastModified, 'MMM dd, yyyy')}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}